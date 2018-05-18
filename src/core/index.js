/**
 * vCore
 * Version: v2.0.0
 * https://github.com/xCss/Valine
 */

function vCoreFactory(options){
    let root = this
    root.initialized = false
    root.Init(options)
    return root
}

vCoreFactory.prototype.Init = function(options){
    let root = this

    let appId = options && (options.appId || options.app_id) || '',
        appKey = options && (options.appKey || options.app_key) || '',
        regions = ['cn','us']
        region = (option.region || 'cn').toLowerCase(),
        region = regions.indexOf(region) > -1 ? region : regions[0]
    
    if(!appId || !appKey) throw 'AV init failed. appId or appKey is null.'
    if(root.initialized) throw 'AV has been initialized.'
    AV.init({
        appId,
        appKey,
        region
    })

    root.initialized = true
    root.v = AV
    return root
}

/**
 * Create ACL
 * @param {Boolean} read Read Access, default true
 * @param {Boolean} write Write Access, default true
 * @returns {Object} ACL 
 */
vCoreFactory.prototype.createACL = function(read,write){
    let root = this
    root.isInit()
    let acl = new root.v.ACL()
    read = typeof read == 'boolean' ? read : true
    write = typeof write == 'boolean' ? write : true
    acl.setPublicReadAccess(read)
    acl.setPublicWriteAccess(write)
    return acl
}

/**
 * Insert Comment
 * @param {Object} comment Comment Content Object
 * @returns {Object} Promise Object 
 */
vCoreFactory.prototype.InsertComment = function(comment){
    let root = this
    root.isInit()
    
    let Ct = root.v.Object.extend('Comment'),
        ct = new Ct()
    comment['insertedAt'] = new Date()
    for(let i in comment){
        if (comment.hasOwnProperty(i)) {
            let _v = comment[i];
            ct.set(i, _v);
        }
    }
    ct.setACL(root.createACL(true,false))
    return ct.save()
}

/**
 * LeanCloud SDK Query Util
 * @param {Object} Q Query Object: {key:'url',val:'path/to/name',clazz:'Comment'}
 * @returns {Object} Promise：Query result 
 */
vCoreFactory.prototype.Query = function(Q){
    let root = this
    root.isInit()
    let rs = new root.v.Query(clazz)
    rs.equalTo(key,val)
    if(calzz == 'Comment'){
        rs.addDescending('createdAt');
        rs.addDescending('insertedAt');
    }
    return rs
}

vCoreFactory.prototype.QueryAll = function(){

}

/**
 * Counter Increment
 * @param {Object} counter Counter Object  {url:'path/to/name',title:'just test title',clazz:'Counter'}
 * @returns {Object} Promise: Current Counter Object
 */
vCoreFactory.prototype.Increment = function(counter){
    let root = this
    root.isInit()
    let url = counter.url || '',
        title = counter.title || '',
        clazz = counter.clazz || 'Counter'
    if(!url) throw 'Counter identification can not be empty.'
    return root.Query('url',url,clazz).then(ret=>{
        let Counter = null
        if(ret.length){
            Counter = ret[0]
            Counter.fetchWhenSave(true)
            Counter.increment('time')
            return Counter.save()
        }else{
            let exCounter = root.v.Object.extend(clazz),
                Counter = new exCounter()
            Counter.setACL(root.createACL())
            Counter.set('url',url)
            Counter.set('title',title)
            Counter.set('time',1)
            return Counter.save()
        }
    })
}

/**
 * Detected Core Initialized
 */
vCoreFactory.prototype.isInit = function(){
    let root = this
    if(!root.initialized) throw 'AV has not been initialized yet.'
}

function vCore(options){
    return new vCoreFactory(options)
}
module.exports = vCore