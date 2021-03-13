import Spinner from "../../components/common/Spinner/Spinner";
import { useDispatch, useSelector } from "react-redux";
import {useEffect} from "react";
import {sendRememberToken} from "../../../redux/reducers/remember-reducer";
import {useRouter} from "next/router";

const RememberPage = () => {
    const dispatch = useDispatch();

    const isPasswordSuccess = useSelector(state => state.remember.isPasswordSuccess);

    const router = useRouter();

    useEffect(() => {
        if(router.query.token) {
            dispatch(sendRememberToken(router.query.token));
        }
    }, [])

    if(!isPasswordSuccess) {
        return <Spinner whiteBg={false}/>;
    }

    return(
        <div className="remember__text">
            На ваш email отправлен новый сгенерированный пароль. Используйте его для входа.
        </div>
    );
}

export default RememberPage;