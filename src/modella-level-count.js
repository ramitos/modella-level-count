var interpolate = require('util').format
var type = require('type-component')

var options = {
  keyEncoding: 'utf8',
  valueEncoding: 'utf8'
}

module.exports = function(db, toCount){
  if (type(toCount) !== 'function') toCount = function(){
    return true
  }

  return function(Model){
    var key = interpolate('/count/' + Model.modelName)
    var count = 0

    db.get(key, function(err, value){
      if (err && err.type !== 'NotFoundError') throw err
      count += Number(value) || 0
    })

    Model.on('saving', function(instance, fn){
      if (!toCount(instance)) return fn()

      instance.model.db.get(instance.primary(), function(err){
        if (err && err.type !== 'NotFoundError') return fn(err)
        count += err ? 1 : 0
        db.put(key, count, options, fn)
      })
    })

    Model.on('removing', function(instance, fn){
      if (!toCount(instance)) return fn()

      instance.model.db.get(instance.primary(), function(err){
        if (err && err.type !== 'NotFoundError') return fn(err)
        count -= err ? 0 : 1
        db.put(key, count, options, fn)
      })
    })

    Model.count = function(){
      return count
    }

    Model.count.increase = function(){
      db.put(key, count += 1, options)
    }

    Model.count.decrease = function(){
      db.put(key, count -= 1, options)
    }
  }
}