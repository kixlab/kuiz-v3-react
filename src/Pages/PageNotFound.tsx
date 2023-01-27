import axios from "axios"
import { useCallback, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { RootState } from "../state/store"
import { enroll } from "../state/features/userSlice"

export const PageNotFound = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

	const uid = useSelector((state:RootState) => state.userInfo?._id);

    const checkValidUser = useCallback(() => {
		axios.post(`${process.env.REACT_APP_BACK_END}/auth/check/inclass`,{
			cid: "invalid",
			uid: uid
		})
		.then((res) => {
			if(!res.data.enrolled){
                navigate('/enroll')
            } else {
                axios.get(`${process.env.REACT_APP_BACK_END}/auth/class/type?cid=`+res.data.cid)
                    .then((res2) => {
                        dispatch(enroll({ cid: res.data.cid, cType: res2.data.cType}));
                            navigate('/'+res.data.cid)
                    })
            }
		})
	},[dispatch, navigate, uid])

	useEffect(() => {
		checkValidUser();
	}, [checkValidUser]);
    
    return(
        <div>Page Not Found 404</div>
    )
}
