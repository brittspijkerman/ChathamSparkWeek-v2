"""Package only the reviewed workshop deliverables; never upload them."""
import argparse, json, re, shutil, zipfile, hashlib, io
from pathlib import Path
from datetime import datetime, timezone
from urllib.parse import urlparse

def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument('--presentation', required=True)
    p.add_argument('--log', required=True)
    p.add_argument('--app-url', required=True)
    p.add_argument('--app-version', required=True)
    p.add_argument('--output-root', default='submission')
    p.add_argument('--project-root', required=True)
    p.add_argument('--project-files', required=True, help='JSON array of explicitly reviewed paths relative to project-root; include REBUILD.md')
    a = p.parse_args()
    kit = Path(__file__).resolve().parent.parent
    project = json.loads((kit/'bundle-manifest.json').read_text(encoding='utf-8-sig'))['project']['key']
    assert re.fullmatch(r'project_\d{2}', project), 'Invalid project key'
    deck, log = Path(a.presentation).resolve(), Path(a.log).resolve()
    assert deck.is_file() and deck.suffix.lower()=='.pptx', 'Provide the editable presentation .pptx'
    assert 0 < deck.stat().st_size <= 50*1024*1024, 'Presentation must be at most 50 MiB'
    with zipfile.ZipFile(deck) as z:
        assert '[Content_Types].xml' in z.namelist() and 'ppt/presentation.xml' in z.namelist(), 'Not a PowerPoint presentation'
    assert log.is_file() and log.suffix.lower() in ('.md','.txt'), 'Provide the completed .md or .txt log'
    text = log.read_text(encoding='utf-8-sig')
    assert 40 <= len(text.strip()) and len(text) <= 100000 and '\0' not in text, 'Log must contain 40–100,000 characters of UTF-8 text'
    u = urlparse(a.app_url)
    assert u.scheme=='https' and u.netloc=='www.chathamvibes.com' and re.fullmatch(r'/vibe_apps/[1-9]\d*(?:/render)?/?',u.path) and not u.query and not u.fragment, 'Use the production Vibes app link'
    version = a.app_version.strip()
    assert 0 < len(version) <= 100, 'Provide the demonstrated version or explicitly say not recorded'
    project_root = Path(a.project_root).resolve()
    selected = json.loads(Path(a.project_files).read_text(encoding='utf-8-sig'))
    assert isinstance(selected,list) and 1 <= len(selected) <= 2000 and all(isinstance(n,str) for n in selected), 'Supply a reviewed file allowlist'
    assert 'REBUILD.md' in selected and len(set(selected))==len(selected), 'Include REBUILD.md, with no duplicate paths'
    forbidden = {'.git','node_modules','.venv','venv','__pycache__','submission','.env','.npmrc','.pypirc','credentials','secrets','chat-history','chat-transcripts'}
    source = io.BytesIO()
    inventory = []
    total = 0
    with zipfile.ZipFile(source,'w',compression=zipfile.ZIP_DEFLATED) as z:
        for name in selected:
            rel = Path(name)
            assert not rel.is_absolute() and '..' not in rel.parts and ':' not in name and '\\' not in name, 'Use safe relative paths with / separators'
            assert not any(x.lower() in forbidden or x.lower().startswith('.env.') for x in rel.parts), 'Excluded private/cache path: '+name
            f=project_root/rel
            assert f.resolve() not in (deck,log) and rel.name not in {'project-log.md','SUBMISSION-FILE-INVENTORY.json'}, 'Keep submission files separate: '+name
            assert f.is_file() and not any(p.is_symlink() for p in [f,*f.parents]), 'Missing file or symlink: '+name
            assert f.resolve().is_relative_to(project_root), 'Path escapes project root'
            assert f.suffix.lower() not in {'.pem','.key','.pfx','.p12','.db','.sqlite','.zip'}, 'Review/export this file separately: '+name
            data=f.read_bytes();total+=len(data)
            assert total<=100*1024*1024, 'Selected project files exceed 100 MiB; remove generated output and caches'
            if f.suffix.lower() in {'.js','.jsx','.ts','.tsx','.json','.md','.txt','.yaml','.yml','.toml','.py','.ps1','.sh','.html','.css'}:
                s=data.decode('utf-8-sig')
                assert not re.search(r'-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY|\b(?:sk-[A-Za-z0-9_-]{20,}|ghp_[A-Za-z0-9]{20,})',s), 'Potential credential in '+name
            z.writestr(rel.as_posix(),data)
            inventory.append({'path':rel.as_posix(),'bytes':len(data),'sha256':hashlib.sha256(data).hexdigest()})
        z.writestr('SUBMISSION-FILE-INVENTORY.json',json.dumps(inventory,indent=2))
    assert 0 < len(source.getvalue()) <= 50*1024*1024, 'Project archive must be at most 50 MiB'
    root = Path(a.output_root).resolve()
    root.mkdir(parents=True, exist_ok=True)
    stamp = datetime.now(timezone.utc).strftime('%Y%m%dT%H%M%S%fZ')
    name = project+'-submission-'+stamp
    folder = root/name
    folder.mkdir()  # Never overwrite an earlier handoff.
    shutil.copyfile(deck, folder/'presentation.pptx')
    (folder/'project-log.md').write_text(text, encoding='utf-8', newline='\n')
    (folder/'project-archive.zip').write_bytes(source.getvalue())
    manifest = dict(schemaVersion=2, projectKey=project, appUrl=a.app_url, appVersion=version,
                    presentation='presentation.pptx', log='project-log.md',projectArchive='project-archive.zip')
    (folder/'submission.json').write_text(json.dumps(manifest,indent=2),encoding='utf-8')
    (folder/'README.txt').write_text('Review the presentation, written Q1-Q6 answers, project source archive, log and app details.\nThe project archive contains reviewed source and REBUILD.md; it is not a standalone offline Vibes app. Check its omissions and setup dependencies.\nIn your assigned project in the Build Lab hub, save the same app link, choose this ZIP, review the loaded items, confirm your review and click Submit.\nLoading a ZIP is not submission. Keep the receipt and these local files.\nPresentations and source archives use app-scoped storage; omit confidential feedback, credentials and private client data. Logs use guarded team/admin records.\nIf the hub fails, email this ZIP only to the facilitator address supplied to you.\n',encoding='utf-8')
    archive = root/(name+'.zip')
    # STORE is intentional: the hub reads this small, fixed format with browser APIs,
    # without a third-party ZIP library or uploading the whole archive to shared storage.
    with zipfile.ZipFile(archive,'x',compression=zipfile.ZIP_STORED) as z:
        for n in ['submission.json','presentation.pptx','project-log.md','README.txt','project-archive.zip']:
            z.write(folder/n,n)
    with zipfile.ZipFile(archive) as z:
        assert z.testzip() is None, 'Archive integrity check failed'
    print(json.dumps({'folder':str(folder),'zip':str(archive),'files':list(manifest.values())[4:],'uploaded':False},indent=2))

if __name__=='__main__':
    main()
