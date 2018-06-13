/**
 * vCore
 * Version: v2.0.0
 * https://github.com/xCss/Valine
 */

function vCoreFactory(options) {
    let root = this
    root.initialized = false
    options && root.Init(options)
    return root
}
vCoreFactory.prototype.Init = function(options) {
    let root = this,
        appId = options && (options.appId || options.app_id) || '',
        appKey = options && (options.appKey || options.app_key) || '',
        regions = ['cn', 'us'],
        region = (options && options.region || 'cn').toLowerCase()
    region = regions.indexOf(region) > -1 ? region : regions[0]

    if (!appId || !appKey) throw new Error('AV init failed. appId or appKey is null.')
    if (!root.initialized){
        root.v = AV
        root.v.init({
            appId,
            appKey,
            region
        })
        root.initialized = true
    }
    return root
}

/**
 * Create ACL
 * @param {Boolean} read Read Access, default true
 * @param {Boolean} write Write Access, default true
 * @returns {Object} ACL 
 */
vCoreFactory.prototype.CreateACL = function(read, write) {
    let root = this
    let acl = new root.v.ACL()
    read = typeof read == 'boolean' ? read : true
    write = typeof write == 'boolean' ? write : true
    acl.setPublicReadAccess(read)
    acl.setPublicWriteAccess(write)
    return acl
}

/**
 * insert Comment
 * @param {Object} comment Comment Content Object
 * @returns {Object} Promise Object 
 */
vCoreFactory.prototype.insert = function(comment) {
    let root = this
    root.isInit()
    let Ct = root.v.Object.extend('Comment'),
        ct = new Ct()
    comment['insertedAt'] = new Date()
    for (let i in comment) {
        if (comment.hasOwnProperty(i)) {
            let _v = comment[i];
            ct.set(i, _v);
        }
    }
    ct.setACL(root.CreateACL(true, false))
    return ct.save()
}

/**
 * LeanCloud SDK Query Util
 * @param {String} key Query key: 'url'
 * @param {String|Array} val Query val: 'path/to/name' or ['path1','path2',...]
 * @param {String} [clazz] Query Class: default 'Comment'
 * @param {Boolean} [isAll] Query All: true or false
 * @returns {Object} Promise：Query result 
 */
vCoreFactory.prototype.Query = function(key, val, clazz, isAll) {
    let root = this
    root.isInit()
    let rs = new root.v.Query(clazz)
    !!isAll && rs.containsAll(key, val) || rs.equalTo(key, val)

    if (calzz == 'Comment') {
        rs.addDescending('createdAt');
        rs.addDescending('insertedAt');
    }
    return rs
}

/**
 * Counter increment
 * @param {Object} counter Counter Object  {url:'path/to/name',title:'just test title',clazz:'Counter'}
 * @returns {Object} Promise: Current Counter Object
 */
vCoreFactory.prototype.Increment = function(newCounter) {
    let root = this
    root.isInit()
    let url = newCounter.url || '',
        title = newCounter.title || '',
        clazz = newCounter.clazz || 'Counter'
    if (!url) throw new Error('Counter identification can not be empty.')
    return root.Query('url', url, clazz).then(ret => {
        let Counter = null
        if (ret.length) {
            Counter = ret[0]
            Counter.fetchWhenSave(true)
            Counter.increment('time')
            return Counter.save()
        } else {
            let exCounter = root.v.Object.extend(clazz),
                Counter = new exCounter()
            Counter.setACL(root.CreateACL())
            Counter.set('url', url)
            Counter.set('title', title)
            Counter.set('time', 1)
            return Counter.save()
        }
    })
}

/**
 * Detected Core Initialized
 */
vCoreFactory.prototype.isInit = function() {
    let root = this
    if (!root.initialized) throw new Error('AV has not been initialized yet.')
    return true
}

function vCore(options) {
    return new vCoreFactory(options)
}
module.exports = vCore