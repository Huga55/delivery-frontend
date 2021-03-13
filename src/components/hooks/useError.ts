import {useEffect} from "react";


const useError = (textError: string | null,
                  errorState: {error: boolean, message: string} ,
                  setError: ({error: boolean, message: string}) => void ) => {
    useEffect(() => {
        if(textError) {
            setError({error: true, message: textError});
        }
        if(!textError && errorState.error) {
            setError({error: false, message: ""});
        }
    }, [textError])
}

export default useError;