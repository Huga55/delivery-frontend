





type GetValidatePropsType = (props: {standart: Array<string>, custom: Array<string>}) => ValidateCustomType


export const getValidateProps: GetValidatePropsType = (props) => {
    let propsObj = {};
    propsObj = getObject({...propsObj}, props.standart, "standart");

        propsObj = getObject({...propsObj}, props.custom, "custom");


    return {...propsObj};
}

const getObject = (obj, arr, type) => {
    if(type === "custom") {
        obj.validate = {};
    }
    for (let elem of arr) {
        if(type === "standart") {
            obj[elem] = validateCustom[elem];
        }else {
            obj["validate"][elem] = validateCustom.validate[elem];
        }
    }
    return {...obj};
}

export type ValidateCustomType = {
    required?: {value: boolean, message: string}
    minLength?: {value: number, message: string}
    validate?: {
        isNumber?: (value: number | string) => boolean | string
        isInn?: (value: string) => boolean | string
        isProfileInn?: (value: string) => boolean | string //for change inn in profile page
        isOgrn?: (value: string) => boolean | string
        isProfileOgrn?: (value: string) => boolean | string //for change ogrn in profile page
        profilePhone?: (value: string) => boolean | string
        phone?: (value: string) => boolean | string
        passwordLength?: (value: string) => boolean | string
        passwordProfileLength?: (value: string) => boolean | string
        time?: (value: string) => boolean | string
    }
}

const validateCustom: ValidateCustomType = {
    required: {
        value: true,
        message: "Заполните все поля",
    },
    minLength: {
        value: 8,
        message: "Минимальная длина 8",
    },
    validate: {
        isNumber: value => (parseInt(value + "") && value > 0) || "Некорректное значение",
        isInn: value => value.length === 10 || "Поле должно иметь 10 символов",
        isProfileInn: value => value.length === 10 || value.length === 0 || "Поле должно иметь 10 символов",
        isOgrn: value => value.length === 13 || "Поле должно иметь 13 символов",
        isProfileOgrn: value => value.length === 13 || value.length === 0 || "Поле должно иметь 13 символов",
        profilePhone: value => value.match(/\+7 \d{3} \d{3}\-\d{2}\-\d{2}/) !== null || value.length === 0 || "Неверно введен номер телефона",
        phone: value => value.match(/\+7 \d{3} \d{3}\-\d{2}\-\d{2}/) !== null || "Неверно введен номер телефона",
        passwordLength: value => value.length > 5 || "Длина пароля должна быть не менее 6ти символов",
        passwordProfileLength: value => value.length > 5 || value.length === 0 || "Длина пароля должна быть не менее 6ти символов",
        time: value => ( value.length === 5 && Number(value.split(":")[0]) < 25 && Number(value.split(":")[1]) < 60 ) || "Время введено неверно",
    }
}