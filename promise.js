//1. promise
const promise = new Promise((resolve, reject) => {
    //중요한 일을 하는 공간 : 프로미스가 불리게 되면 바로 실행되기 때문! 네트워크 연결이나 파일을 읽어오는 기능 등을 넣을 수 있음.
    console.log('doing something...');
    setTimeout(()=> {
        resolve('gwon');

        reject(new Error('no network')) //에러 클래스는 자바스크립트에서 제공하는 함수중 하나.
    }, 2000)
})

//2. Comsumers : then, catch, finally
promise
.then((value) => { //프로미스에서 잘 수행이 되고 resolve의 매개변수를 value로 받을 수 있음.
    console.log(value)

})
.catch(error => {
    console.log(error)
})
.finally(() => {//성공과 실패와 상관없이 마지막에 무조건 수행되는 것.
    console.log('마지막')
})

//3. promise chaining
const fetchNumber = new Promise((resolve, reject)=> {
    setTimeout(() => resolve(1), 1000);
})

fetchNumber
.then(num => num*2)
.then(num => num*3)
.then(num => {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(num -1), 1000);
    });
})
.then(num => console.log(num))

