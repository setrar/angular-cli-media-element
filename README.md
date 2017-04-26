# Running media-element with Angular CLI



| Protocol |    URL                                                                      |    Browsers                                 |  Comments                  |
|:--------:|:---------------------------------------------------------------------------:|:--------------------------------------------|:---------------------------| 
|          |                                                                             |    Mac               |   Windows            |                            |
|          |                                                                             | FFOX | CHRM | SAFR   |  FFOX | CHRM | EDGE  |                            |
|   RTMP   |rtmp://media.crave.fm:1935/vod/mp3:TIAr0000000196Al0000000001So0000006243.mp3|      |      |        |  x    | x    |       |                            |


## play backend

update build.sbt

```scala

/* ================================= ng build ================================== */

val frontEndProjectName = "frontend"
val backEndProjectName = "backend"
val distDirectory = ".." + backEndProjectName + "public/dist"

// Starts: angularCLI build task
val frontendDirectory = baseDirectory {_ /".."/frontEndProjectName}

val ng = sys.props("os.name").toLowerCase match {
  case os if os.contains("win") => "cmd /c ng"
  case _ => "ng"
}

val params = sys.props("os.name").toLowerCase match {
  case os if os.contains("win") => " build --deploy-url /dist --output-path ..\\backend\\public\\dist --progress "
  case _ => " build --deploy-url /dist --output-path ../backend/public/dist --progress "
}

val ngBuild = taskKey[Unit]("ng build task.")
ngBuild := { Process( ng + params , frontendDirectory.value) ! }
(packageBin in Universal) <<= (packageBin in Universal) dependsOn ngBuild
// Ends.
```

## @angular/cli frontend

```
$ ng new frontend --style=scss
$ cd frontend
```

install media-element along with dash
```
$ npm install mediaelement --save
$ npm install dashjs --save
```


Edit `.angular-cli.json`by adding
```
      "styles": [
        "styles.scss",
        "../node_modules/mediaelement/build/mediaelementplayer.min.css"
      ],      
      "scripts": [
        "../node_modules/mediaelement/mediaelement-and-player.min.js",        
        "../node_modules/dashjs/dist/dash.all.min.js"
      ],
```

copy all flash files to assets folder
```
$ mkdir src/assets/mejs/swf
$ cp node_modules/mediaelement/build/*.swf src/assets/mejs/swf
$ cp node_modules/mediaelement/build/*.svg src/assets/mejs
```

## detect browser

```
$ npm install detect-browser --save
```

