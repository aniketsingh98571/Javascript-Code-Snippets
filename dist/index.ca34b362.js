console.log("Exporting module");const o=await fetch("https://jsonplaceholder.typicode.com/posts"),t=await o.json();console.log(t);const e=async function(){let o=await fetch("https://jsonplaceholder.typicode.com/posts"),t=await o.json();return console.log(t),{title:t.at(-1).title,text:t.at(-1).body}},l=e();console.log(l),l.then(o=>{console.log(o)}),console.log("importing module"),[].push("Mobile pushed to cart"),console.log(237,23,28);//# sourceMappingURL=index.ca34b362.js.map

//# sourceMappingURL=index.ca34b362.js.map
