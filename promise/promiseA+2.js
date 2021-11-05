/**
 * 了解术语
 * promise 是一个包含 then 方法的对象或函数，该方法符合规范指定的行为
 * thenable 是一个包含 then 方法和对象或者函数
 * value 就是任意合法的 JS 值
 * exception 就是 throw 语句抛出的值
 * reason 是一个指示3 promise 为什么被 rejected 的值
 * 
 * Promise 状态：
 * 1、pending 状态，可以切换到fulfilled 或 rejected 
 * 2、fulfilled 状态，不能迁移到其他状态、必须有个不可变的 value 
 * 3、rejected 状态，不能迁移到其他状态，必须有个不可变的 reason 
 * 
 * 
 * Then 方法
 * 
 * 
 */