/**
 * Date: 2018/8/15
 * Author: dylan_xi
 * Desc: 数据监听器
 * 
 * module use example:
 *      创建数据监听:
 *          this.testNotify = DataNotify.create(this, 'test' , 1) 
 *      添加监听:
 *          this.testNotify.addListener(this.setStr, this)
 *      移除监听:
 *          this.testNotify.removeListener(this.setStr , this)
 *      修改监听数据:
 *          this.test= this.test+1 (数据修改会立即通知所有的监听者)
 */

var DataNotify = cc.Class({
    
    ctor(data){
        this._listeners = [];
        this._data = data;
    },

    addListener(callback , target){
        var listener = {
            callback : callback,
            target: target
        }
        for (const listener of this._listeners) {
            if (target === listener.target){
                return
            }
        }
        this._listeners.push(listener)
    },

    removeListener(callback , target){
        for (const listener of this._listeners) {
            if (listener.callback === callback && target === listener.target){
                cc.js.array.remove(this._listeners, listener)
                break
            }
        }
    },

    getData(){
        return this._data;
    },

    setData(data){
        this._data = data;
        this.update();
    },

    update(){
        this._listeners.forEach(element => {
            element.callback.call(element.target , this._data);
        });
    },

    statics: {
        create(module , dataName , defaultData){
            let dataNotify = new DataNotify(defaultData);
            Object.defineProperty(module , dataName,{
                get: function(){return dataNotify.getData()},
                set: function(data){return dataNotify.setData(data)}
            })
            return dataNotify;
        }
    },
});