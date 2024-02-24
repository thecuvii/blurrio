<h1 align="center">Blurrio</h1>
<p align="center">Generate image placeholder in browser at ease.</p>


## Usage

```tsx
import { generate } from 'blurrio'

// runs in browser, returns a base64 string
const blur = await generate(file, 180)

<img src={blur}/>
```

## TODO 

- [ ] Support more input formats.
- [ ] Support nodejs via sharp.

## Credit

This package is simply a tiny wrapper for [StackBlur.js](https://github.com/flozz/StackBlur).
