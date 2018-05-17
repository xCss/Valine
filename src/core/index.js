/**
 * vCore
 * Version: v2.0.0
 * https://github.com/xCss/Valine
 */

function vCoreFactory(options){
    this.options = options
    this.Init()
}


vCoreFactory.prototype.Init = function(){

}


function vCore(options){
    return new vCoreFactory(options)
}
module.exports = vCore