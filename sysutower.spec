# -*- mode: python -*-

block_cipher = None

a = Analysis(['client.py'],
             pathex=['.'],
             binaries=[],
             datas=[
               ('basis.db', '.'),
               ('C:/Python37/Lib/site-packages/jieba/dict.txt', 'jieba'),
               ('C:/Python37/Lib/site-packages/jieba/analyse/idf.txt', 'jieba/analyse')
             ],
             hiddenimports=['jieba'],
             hookspath=[],
             runtime_hooks=[],
             excludes=[],
             win_no_prefer_redirects=False,
             win_private_assemblies=False,
             cipher=block_cipher,
             noarchive=False)
pyz = PYZ(a.pure, a.zipped_data,
             cipher=block_cipher)
exe = EXE(pyz,
          a.scripts,
          [],
          exclude_binaries=True,
          name='SYSU_Tower_Server',
          debug=False,
          bootloader_ignore_signals=False,
          strip=False,
          upx=True,
          console=True , icon='frontend\\public\\icon.ico')
coll = COLLECT(exe,
               a.binaries,
               a.zipfiles,
               a.datas,
               Tree('./frontend/dist_electron/win-unpacked'),
               Tree('C:/Python37/Lib/site-packages/thulac/models/', prefix='THUmodel/'),
               strip=False,
               upx=True,
               name='SYSU_Tower')
