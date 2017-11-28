# base-amd-loader
An simple AMD module loader

```javascript
(async function(){
    const $ = await requireModule('./path/to/jquery.min.js');
    //now you can do anything with $ as jQuery
    $(...)
})();
```
