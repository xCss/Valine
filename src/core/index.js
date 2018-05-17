/**
 * vCore
 * Version: v2.0.0
 * https://github.com/xCss/Valine
 */

function vCoreFactory(options){
    let root = this
    root.Init(options)
}


vCoreFactory.prototype.Init = function(options){

    let root = this

    root.initialized = false

    root.options = options

    let appId = options && (options.appId || options.app_id) || '',
    appKey = options && (options.appKey || options.app_key) || '',
    region = (option.region || 'cn').toLowerCase(),
    regions = ['cn','us']

    region = regions.indexOf(region) > -1 ? region : regions[0]
    
    if(!appId || !key) throw 'AV init failed. appId or appKey is null'

    AV.init({
        appId,
        appKey,
        region
    })

    root.v = AV

    return root
}
/**
 * LeanCloud SDK Query Util
 * @param {String} key Query condition name
 * @param {String} val Query condition value
 * @param {String} clazz Query class
 * @param {String} sort Query result sort {type:asc-true|desc-false,val:sort key}
 */
vCoreFactory.prototype.Query = function(key,val,clazz,sort){
    let root = this,
    q = new root.v.Query(clazz)
    q.equalTo(key,decodeURI(val))
    if(sort){
        sort.type && q.ascending(sort.val) || q.descending(sort.val)
    }else{
        q.addDescending('createdAt');
        q.addDescending('insertedAt');
    }
    return q
}

vCoreFactory.prototype.Insert = function(comment,cb){
    let root = this,
    Ct = root.v.Object.extend('Comment')
    comment['insertedAt'] = new Date()

    let ct = new Ct()

}




function vCore(options){
    return new vCoreFactory(options)
}
module.exports = vCore