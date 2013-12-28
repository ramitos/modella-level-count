# modella-level-count

[![NPM version](https://badge.fury.io/js/modella-level-count.png)](http://badge.fury.io/js/modella-level-count)
[![Dependency Status](https://gemnasium.com/ramitos/modella-level-count.png)](https://gemnasium.com/ramitos/modella-level-count)

## install

```bash
npm install [--save/--save-dev] modella-level-count
```

## api

```js
Model.use(db, function(model){
  return model.should_be_counted()
})

Model.count() // => number of models
```

## license

MIT