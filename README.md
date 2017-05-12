# Running media-element with Angular CLI

## Live_streaming_web_audio_and_video

https://developer.mozilla.org/en-US/Apps/Fundamentals/Audio_and_video_delivery/Live_streaming_web_audio_and_video

## Testing  

| Protocol |    URL                                                                      |    Browsers                                 |  Comments                  |
|:--------:|:---------------------------------------------------------------------------:|:--------------------------------------------|:---------------------------| 
|          |                                                                             |    Mac               |   Windows            |                            |
|          |                                                                             | FFOX | CHRM | SAFR   |  FFOX | CHRM | EDGE  |                            |
|   RTMP   |rtmp://media.crave.fm:1935/vod/mp3:TIAr0000000196Al0000000001So0000006243.mp3|      |      |        |  x    | x    |       |                            |


## play backend


Create a play backend

  > sbt version 13.2.13+

```
$ sbt new typesafehub/play-scala.g8 --name=backend
```

update build.sbt

```sbt
/* ================================= ng build ================================== */

val frontEndProjectName = "frontend"
val backEndProjectName = "backend"

// Starts: angularCLI build task
val frontendDirectory = baseDirectory {_ /".."/frontEndProjectName}

val params = " --aot=false --progress --deploy-url /dist/ "

val outputPath = sys.props("os.name").toLowerCase match {
  case os if os.contains("win") => " --output-path ..\\backend\\public\\dist "
  case _ => " --output-path ../backend/public/dist "
}

val cmd = sys.props("os.name").toLowerCase match {
  case os if os.contains("win") => "cmd /c ng build" + params + outputPath
  case _ => "ng build" + params + outputPath
}

val ngBuild = taskKey[Unit]("ng build task.")
ngBuild := { Process( cmd , frontendDirectory.value) ! }
(packageBin in Universal) := ((packageBin in Universal) dependsOn ngBuild ).value
// Ends.
```
update  app/controllers/HomeController.scala
```scala
package controllers

import javax.inject.{Inject,Singleton}

import play.api.mvc.{Controller,Action}

// Import required for injection
import scala.concurrent.ExecutionContext

/**
 * This controller creates an `Action` to handle HTTP requests to the
 * application's home page.
 */
@Singleton
class HomeController @Inject()(implicit ec: ExecutionContext) extends Controller {

  def index = Assets.versioned(path="/public/dist", "index.html")

  def dist(file: String) = Assets.versioned(path="/public/dist", file)

}

```

update conf/routes
```
...
# Bundle files generated by Webpack
GET     /dist/*file                 controllers.HomeController.dist(file)
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

