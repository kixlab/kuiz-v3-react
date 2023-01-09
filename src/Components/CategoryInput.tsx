import { useEffect, useRef, useState } from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'

interface Props {
  getCategory: (cats: string[]) => void
}

export const CategoryInput = ({ getCategory }: Props) => {
  const inputRef = useRef<string>('')
  //Should get category data from db
  const [catList, setCatList] = useState<string[]>(['Common misconception', 'Form similar to answer'])
  const [selections, setSelections] = useState<string[]>([])

  function addElement() {
    if (!catList.includes(inputRef.current) && inputRef.current != '') setCatList([inputRef.current, ...catList])
    else if (inputRef.current == '') alert('Please enter the category') //no input case
    else alert('You have the same category') //duplicates case
  }

  function removeElement(arr: string[], item: string) {
    return arr.filter(e => e != item)
  }

  useEffect(() => {
    //if the category list is updated, selected category will be changed
    getCategory(selections)
  }, [selections])

  return (
    <div>
      <CatBox>
        +
        <CatInput
          style={{ border: 'none' }}
          onChange={e => (inputRef.current = e.target.value)}
          type="text"
          placeholder="Select categories for your option or add your own"
        />
        <AddBtn onClick={addElement}>Add</AddBtn>
      </CatBox>
      <Categories>
        {catList.map((e, idx) => {
          return (
            <Category key={idx} selected={selections.includes(e)}>
              <div
                onClick={() => {
                  if (selections.includes(e)) {
                    setSelections(removeElement(selections, e))
                  } else setSelections([...selections, e])
                  getCategory(selections)
                }}
              >
                {e}
              </div>

              <DeleteCat
                onClick={() => {
                  setCatList(removeElement(catList, e))
                  setSelections(removeElement(selections, e))
                }}
              >
                <FontAwesomeIcon icon={faX} />
              </DeleteCat>
            </Category>
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
    border: none;
    outline: none;
  }
`

const AddBtn = styled.div`
  color: #3d8add;
  border-bottom: 1px solid rgba(0, 0, 0, 0);
  cursor: pointer;
  &:hover {
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

const Category = styled.div<{ selected: boolean }>`
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 0px 16px 0px 16px;
  border-radius: 20px;
  background-color: #e1e5eb;
  color: #212121;
  cursor: pointer;
  &:hover {
    background-color: #b6c7db;
  }
  ${props =>
    props.selected &&
    css`
      background-color: #b6c7db;
    `}
`

const DeleteCat = styled.div`
  padding: 8px 0px 10px 0px;
  color: #345478;
  :hover {
    color: white;
  }
`
