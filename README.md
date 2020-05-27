<img src="imgwiz.svg" height="140"/>

# express-imgwiz

Format, resize images on-the-fly for `expressjs`. `express-imgwiz` use `sharp` underneat. It comes as both [middleware](#use-as-a-middleware-serve-static-files) and [request handler](#use-as-a-handler-serve-photos-from-urls).

Tips: Use with a CDN service to not re-generate image every time a request comes in. Remember to set cache TTL for a long period. If you are using Cloudflare, set the option to cache everything.

Example: [resized image url](https://wiz.saltar.co/photos/?url=https://i.imgur.com/MBDUWNw.jpg&sharpen=true&fm=webp&h=50)

![resized image](https://wiz.saltar.co/photos/?url=https://i.imgur.com/MBDUWNw.jpg&sharpen=true&fm=webp&h=50)


## Installation

`express-imgwiz` is available as a npm package. You can install via `npm` or `yarn` as normal

```ssh
// install using npm
$ npm install express-imgwiz

// install using yarn
$ yarn add express-imgwiz
```

## Use as a middleware (serve static files)

### Usage

- Function: `imgWizMiddleware`
- Arguments:
    - `staticDir` (string, required): your static image directory 
    - `cacheDir` (string): save generated file on disk into the given directory

### Example

```js
import { imgWizMiddleware } from "express-imgwiz";
import path from "path";

app.use("/static", imgWizMiddleware({ 
    staticDir: path.join(__dirname, "static"),
    // cacheDir: path.join(__dirname, "cached") // add this option to enable local caching
}))

// Uage example: https://yourdomain.com/static/image-file.png&fm=png&q=80&sharpen=true
```

### Available transform options:

- `h` (number): resize height (h=460)
- `w` (number): resize width (w=640)
- `q` (number): quality (q=80)
- `fit` ("cover" | "contain" | "fill" | "inside" | "outside"): resize fit
- `position` ("top" | "right top" | "right" | "right bottom" | "bottom" | "bottom left" | "left top"): resize position
- `background`: (string): background colour when using a `fit=contain` (background=blue, background=#ffffff, background=(139,195,74,0.4))

- `sharpen` ("true" | "sigma ?, flat (1), jagged (2)"): sharpen target image (sharpen=true, [view more about sharpen](https://sharp.pixelplumbing.com/en/stable/api-operation/#sharpen))
- `fm` ("webp" | "jpg" | "jpeg" | "tiff" | "png"): format target image
- `kernel` ("nearest" | "cubic" | "mitchell" | "lanczos2" | "lanczos3"): image kernel option
- `enlarge` ("true" | "false"): enlarge image if given size is bigger than actual size
- `blur` ("true" or number (0.1 - 1000)): blur image

## Use as a handler (serve photos from URLs)

### Usage

- Function: `imgWizHandler`
- Arguments:
    - `cacheDir` (string): save generated file on disk into the given directory

_Note: imgWizHandler is a initiate function in v0.0.3. So instead of using `imgWizHandler`, use `imgWizHandler()`_

### Example

```js
import { imgWizHandler } from "express-imgwiz";

app.get("/photos", imgWizHandler({
    // cacheDir: path.join(__dirname, "cached") // add this option to enable local caching
}))

// Uage example: https://yourdomain.com/photos/?url=https://imagehost.com/image-file.png&fm=png&q=80&sharpen=true
```

### Available transform options:

- *all options supported as middleware above
- `url` (string, required): target image url

Note: Use `encodeURIComponent` if `url` has query, otherwise it will fail. For example: `encodeURIComponent("https://host.com/photo.png?quey=value")`

# Changelog

- v0.0.9: fix serving local `svg` file, clean up codes
- v0.0.8: fix `.svg` image error, added `background` option (thanks to @TheAndroidGuy)
- v0.0.6-0.0.7: code improvement
- v0.0.5: added local cache
- v0.0.4: update server response status code
- v0.0.3: added local cache
- v0.0.1-v0.0.2: intiate project

Feel free to ask or give feedback. Thank you!