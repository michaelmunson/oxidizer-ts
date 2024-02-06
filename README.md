const a1 = A<{a:number}>({props: {a:123}}, [
        ({a}) => ''
    ]);

    const a2 = A<{b:string}>({href:"asd", props: {b:'asd'}}, [
        ({b}) => 'asd'
    ]);