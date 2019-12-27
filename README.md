# express-imgwiz

Format, resize images on-the-fly expressjs. `express-imgwiz` use `sharp` underneat. It comes as both `middleware` and `handler`.

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

## Use as a middleware

```js
import { imgWizMiddleware } from "express-imgwiz";
import path from "path";

app.use("/static", imgWizHandler({ staticDir: path.join(__dirname, "static") }))

// Uage example: https://yourdomain.com/static/image-file.png&fm=png&q=80&sharpen=true
```

### Available arguments:
- `h` (number): resize height (h=460)
- `w` (number): resize width (w=640)
- `q` (number): quality (q=80)
- `fit` ("cover" | "contain" | "fill" | "inside" | "outside"): resize fit
- `position` ("top" | "right top" | "right" | "right bottom" | "bottom" | "bottom left" | "left top"): resize position
- `sharpen` ("true" | "sigma ?, flat (1), jagged (2)"): sharpen target image (sharpen=true, [view more about sharpen](https://sharp.pixelplumbing.com/en/stable/api-operation/#sharpen))
- `fm` ("webp" | "jpg" | "jpeg" | "tiff" | "png"): format target image
- `kernel` ("nearest" | "cubic" | "mitchell" | "lanczos2" | "lanczos3"): image kernel option
- `enlarge` ("true" | "false"): enlarge image if given size is bigger than actual size
- `blur` ("true" or number (0.1 - 1000)): blur image

## Use as a handler

```js
import { imgWizHandler } from "express-imgwiz";

app.get("/photos", imgWizHandler)

// Uage example: https://yourdomain.com/photos/?url=https://imagehost.com/image-file.png&fm=png&q=80&sharpen=true
```

### Available arguments:

- *all arguments supported as middleware above
- `url` (string, required): target image url