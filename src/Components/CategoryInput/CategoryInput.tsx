import { useEffect, useRef, useState } from 'react'
import styled from '@emotion/styled';

interface Props {
  getCategory: (categories: string) => void
}

const CategoryInput = ({ getCategory }: Props) => {
  const inputRef = useRef<string>('')
  //추후에 DB로부터 받아올 예정..? 받아와야하나?
  const [catList, setCatList] = useState<string[]>(['Common misconception', 'Form similar to answer'])
  const [selectedCat, setSelectedCat] = useState<string>('')
export const CategoryInput = (props:{ getCategory: Function }) => {
    const inputRef = useRef<string>("");
    //추후에 DB로부터 받아올 예정..? 받아와야하나?
    const [catList, setCatList] = useState<string[]>(["Common misconception", "Form similar to answer"]);
    const [selectedCat, setSelectedCat] = useState<string>("");

  function addCategory() {
    if (!catList.includes(inputRef.current) && inputRef.current != '') setCatList([inputRef.current, ...catList])
    else if (inputRef.current == '') alert('Please enter the category') //no input case
    else alert('You have the same category') //duplicates case
  }

  useEffect(() => {
    //if the category list is updated, selected category will be changed
    setSelectedCat(catList[0])
    getCategory(catList[0])
  }, [catList])

    return (
            <div>
                <CatBox>+
                    <CatInput style={{border: 'none'}} onChange={(e) => inputRef.current = e.target.value}
                        type="text"
                        placeholder='Select categories for your option or add your own'/>
                    <AddBtn onClick={addCategory} >Add</AddBtn>
                </CatBox>
                <Categories>
                    {catList.map((e,idx) => {
                        return (
                            <div key={idx} 
                                onClick={() => {setSelectedCat(e); props.getCategory(e);}} 
                            >
                                {e===selectedCat ? <CategoryAct>{e}</CategoryAct>: <Category>{e}</Category>}
                            </div>
                        )
                    })}
                </Categories>
            </div>
    )
}


const CatBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: #e1e5eb;
    margin-top: 12px;
    padding: 4px 16px 4px 16px;
    border-radius: 6px;
    font-size: 16px;
    font-weight: 500;
`

const CatInput = styled.input`
    padding: 16px;
    border-radius: 6px;
    width: 100%;
    box-sizing: border-box;
    font-size: 16px;
    outline: none;
    background: none;
    margin: 0;
    &:focus {
        border:none;
        outline:none;
    }
`

const AddBtn = styled.div`
    color: #3d8add;
    border-bottom: 1px solid rgba(0,0,0,0);
    cursor: pointer;
    &:hover{
        color: #2062aa;
        border-color: #2062aa;
    }
`

const Categories = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    gap: 6px;
    font-size: 14px;
    margin-top: 10px;
`


const Category = styled.div`
    padding: 8px 16px 10px 16px;
    border-radius: 20px;
    background-color: #e1e5eb;
    color: #212121;
    cursor: pointer;
    &:hover {
        background-color: #ced8e4;
    }
`
const CategoryAct = styled.div`
    padding: 8px 16px 10px 16px;
    border-radius: 20px;
    background-color: #e1e5eb;
    color: #212121;
    cursor: pointer;
    background-color: #b9c6d6;
    &:hover {
        background-color: #ced8e4;
    }
`