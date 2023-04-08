import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { palette, typography } from '@styles/theme'
import { useCallback, useEffect, useRef, useState } from 'react'
import { TextButton } from './basic/button/Text'

interface Props {
  getCategory: (cats: string[]) => void
}

export const CategoryInput = ({ getCategory }: Props) => {
  const inputRef = useRef<string>('')
  const [categories, setCategories] = useState<string[]>(['Common misconception', 'Form similar to answer'])
  const [selections, setSelections] = useState<string[]>([])

  const addElement = useCallback(() => {
    if (!categories.includes(inputRef.current) && inputRef.current != '')
      setCategories([inputRef.current, ...categories])
    else if (inputRef.current == '') alert('Please enter the category') //no input case
    else alert('You have the same category') //duplicates case
  }, [categories, inputRef])

  const selectElement = useCallback(
    (item: string) => () => {
      if (selections.includes(item)) {
        setSelections(selections.filter(s => s != item))
      } else {
        setSelections([...selections, item])
      }
      getCategory(selections)
    },
    [getCategory, selections]
  )

  const deleteElement = useCallback(
    (item: string) => () => {
      setCategories(categories.filter(c => c != item))
      setSelections(selections.filter(s => s != item))
    },
    [categories, selections]
  )

  useEffect(() => {
    //if the category list is updated, selected category will be changed
    getCategory(selections)
  }, [getCategory, selections])

  return (
    <div>
      <CatBox>
        +
        <CatInput
          type="text"
          style={{ border: 'none' }}
          onChange={e => (inputRef.current = e.target.value)}
          placeholder="Select categories for your option or add your own"
        />
        <TextButton onClick={addElement} color={palette.grey400}>
          Add
        </TextButton>
      </CatBox>
      <Categories>
        {categories.map((e, idx) => {
          return (
            <Category key={idx} selected={selections.includes(e)}>
              <CategoryLabel onClick={selectElement(e)}>{e}</CategoryLabel>
              {idx < categories.length - 2 && <DeleteIcon onClick={deleteElement(e)}>X</DeleteIcon>}
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
  background-color: ${palette.background.main};
  padding: 4px 16px 4px 16px;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
`

const CatInput = styled.input`
  ${typography.b02};
  padding: 16px;
  border-radius: 6px;
  width: 100%;
  box-sizing: border-box;
  outline: none;
  background: none;
  margin: 0;
  &:focus {
    border: none;
    outline: none;
  }
`

const Categories = styled.div`
  ${typography.b03};
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 6px;
  margin-top: 10px;
`

const Category = styled.div<{ selected: boolean }>`
  display: flex;
  height: 32px;
  gap: 12px;
  align-items: center;
  padding: 0px 16px 0px 16px;
  border-radius: 20px;
  background-color: ${palette.background.main};
  color: ${palette.grey200};
  cursor: pointer;
  &:hover {
    background-color: ${palette.background.dark};
  }
  ${props =>
    props.selected &&
    css`
      background-color: ${palette.background.dark};
    `}
`

const CategoryLabel = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
`

const DeleteIcon = styled.div`
  padding: 8px 0px 10px 0px;
  color: ${palette.primaryDark};
  :hover {
    color: ${palette.common.white};
  }
`
