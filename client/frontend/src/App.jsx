import { useState } from 'react'




function App() {
    const name = "hari";
    const [count, setCount] = useState(0);

    const updateCount = () => {
        setCount(count + 1);
    };

    return (
        <>
            <h1>Parent Component</h1>
            <PrimaryButton count={count} onClick={updateCount} />
            <PrimaryButton count={count} onClick={updateCount} />
        </>
    );
}

export default App;
    