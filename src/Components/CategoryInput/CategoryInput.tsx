import React, { useEffect, useRef, useState, ComponentProps } from 'react';
import "./CategoryInput.scss";

const CategoryInput = () => {
    const inputRef = useRef<string>("");
    //추후에 DB로부터 받아올 예정..? 받아와야하나?
    const [catList, setCatList] = useState<string[]>(["Common misconception", "Form similar to answer"]);
    const [selectedCat, setSelectedCat] = useState<string>("");

    function addCategory() {
        if (!catList.includes(inputRef.current)) setCatList([inputRef.current, ...catList]);
        else alert("You have the same category")
    }
    
    useEffect (() => {
        setSelectedCat(catList[0]);
    }, [catList])

    return (
            <div>
                <div className="CatBox">+
                    <input onChange={(e) => inputRef.current = e.target.value}
                        id="CatInput"
                        type="text"
                        placeholder='Select categories for your option or add your own'/>
                    <div onClick={addCategory} id="AddBtn">Add</div>
                </div>
                <div className='Categories'>
                    {catList.map((e,idx) => {
                        return (
                            <div key={idx} 
                                onClick={() => setSelectedCat(e)} 
                                className={e===selectedCat ? 'CategoryAct' : 'Category'}
                            >{e}</div>
                        )
                    })}
                </div>
            </div>
    )
}

export default CategoryInput;