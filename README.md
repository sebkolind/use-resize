# useResize

Listen on any components width and height via a convenient hook. Built for Preact with Typescript.

## Installation

```bash
npm i @sebkolind/use-resize
```

## Basic usage

The hook is written in Typescript, and the examples are all in Typescript - you should consider using Typescript.

```tsx
import {h, Component} from 'preact';
import {useResize} from '@sebkolind/use-resize';

import {MyOtherComponent} from './components/MyOtherComponent';

const MyComponent: FunctionalComponent = () => {
    const ref = useRef<Component>();
    const {width, height, isMobile, isWide} = useResize(ref, {isMobile: 450});

    // Gives you the width & height of <MyOtherComponent />
    console.log(width, height);

    // `boolean` which tells you if the width is _below_ the isMobile threshold.
    console.log(isMobile);

    // `boolean` which tells you if the width is _above_ the isWide threshold.
    console.log(isWide);

    return (
        <div>
            <MyOtherComponent ref={ref} />
            {isMobile && <div>Only show me when width is below isMobile threshold.</div>}
        </div>
    )
}
```

## Options

- `isMobile` set the threshold for a mobile layout. (Default: 760)
- `isWide` set the threshold for a wide layout. (Default: 1000)

### Usage with options

```ts
useResize(ref, {isMobile: 325, isWide: 1450});
```

