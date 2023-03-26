---
title: Desktop App Converter Note
date: 2019-06-10 08:20:33
tags:
- Csharp
- UWP
categories: Config
---

# Steps
- Administrator mode running [Desktop App Converter](https://www.microsoft.com/en-us/p/desktop-app-converter/9nblggh4skzw)
- Input Command
``` bash
DesktopAppConverter.exe -Installer C:\Users\qq234\App\ -AppExecutable  vApp.exe -Destination C:\Output\vApp -PackageName "vApp" -Publisher "CN=C02xx-xxx-xxx" -Version 0.0.0.1 -MakeAppx -Sign -Verbose -Verify
```

![](https://i.imgur.com/10B1afZ.jpg)

- Update the Assert Folder with modified image, [Tools-icongen](http://cthedot.de/icongen/#output)
- Update `PackageFiles\AppxManifest.xml` with correct identity app name and publisher. (More info can Check `project -> store -> Associate App with the Store`)
``` xml
<Identity Name="6xxxxPUBLISHER.vApp" ProcessorArchitecture="x86" Publisher="CN=C02xxx-xxx-xxx-xxx-xxx" Version="1.0.0.0" />
```

![](https://i.imgur.com/0fIFLpp.jpg)

- Go to CMD Administrator mode and into folder `C:\Program Files (x86)\Windows Kits\10\bin\10.0.17763.0\x64`. 
- Run makeappx command for generate the new appx
``` bash
makeappx pack -d "C:\Output\vApp\vApp\PackageFiles" -p "C:\Output\vApp\vApp\vApp.appx"
```

![](https://i.imgur.com/BB3ncRR.png)

- (Run sign command if needed)
``` bash
signtool.exe sign /a /v /fd SHA256 /f "C:\Output\vApp\vApp\auto-generated.pfx" /p "123456" "C:\Output\vApp\vApp\vApp.appx"
```

![](https://i.imgur.com/ux2ZP6x.jpg)

- Submit to [Windows Dev Center](https://developer.microsoft.com/en-us/windows) / Partner Center
- Generate [Banner/badge](https://developer.microsoft.com/en-us/store/badges)

# Reference
- [Desktop Bridge – Converting an installer with Desktop App Converter](https://blogs.msdn.microsoft.com/appconsult/2016/10/17/desktop-bridge-converting-an-installer/)
- [Using the updated Desktop App Converter to manually convert a desktop application](https://blogs.msdn.microsoft.com/appconsult/2017/03/09/using-the-updated-desktop-app-converter-to-manually-convert-a-desktop-application/)