import axios from "axios";
import {DataOfFormDelivery, FeedbackFormType} from "../../redux/reducers/form-reducer";
import {DataNewAddressType} from "../../redux/reducers/book-reducer";
import {GetOrderDataType} from "../../redux/reducers/actualOrder-reducer";

let token = null;
if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
}

export const instance = axios.create({
    baseURL: 'http://express/api/',
    //baseURL: 'https://deliveryapi.wimdev.com/api/',
    headers: {
        Authorization: token,
    }
});

export const userAPI = {
    getInitial() {
        return instance.get("auth/me")
            .then(response => response.data);
    },

    registerOfUser(name: string, password: string, phone: string, email: string, isJuristic: boolean, nameOrganization: string | null,   inn: string | null, ogrn: string | null,  address: string | null ) {
        return instance.post("auth/register", {name, nameOrganization, phone, email, password, inn, ogrn, isJuristic, address})
            .then(response => response.data);
    },

    authOfUser(email: string, password: string) {
        return instance.post("auth/login", {email, password})
            .then(response => response.data);
    },

    logOut() {
        return instance.put("user/logout")
            .then(response => response.data);
    },

    getName(inn) {
        return instance.get(`register/getName/${inn}`)
            .then(response => response.data);
    },

    sendAvatar(img) {
        const formData = new FormData();
        formData.append("img", img);
        return instance.post('user/avatar', formData, {
            headers: {
                "Content-Type": 'multipart/form-data',
                "processData": false,
                "contentType": false,
            }
        }).then(response => response.data);
    },
}

export const dadataAPI = {
    getAdrress(address: string) {
        return instance.post("query/address", {address})
            .then(response => response.data);
    },

    getAddressFromCoordinates(coordinates: string[]) {
        return instance.post("query/map/address", {coordinates})
            .then(response => response.data);
    }
}

export const feedbackAPI = {
    getCaptcha() {
        return instance.get("captcha")
            .then(response => response.data);
    },

    sendMessage(data: FeedbackFormType) {
        return instance.post("feedback", {...data})
            .then(response => response.data);
    }
}

export const deliveryAPI = {
    sendDataDelivery(data: DataOfFormDelivery) {
        return instance.post("delivery/create", {...data})
            .then(response => response.data);
    },

    getPrice(data) {
        return instance.post("delivery/price", {...data})
            .then(response => response.data);
    },
}

export const lkAPI = {
    sendNewAddress(data: DataNewAddressType) {
        return instance.post("book/create", {...data})
            .then(response => response.data);
    },

    getAddresses(countNeed: number, currentPage: number, nameFilter: string | null, newFilter: string | null) {
        return instance.get(`book/get/${countNeed}/${currentPage}/${nameFilter}/${newFilter}`)
            .then(response => response.data);
    },

    changeAddress(data) {
        return instance.put('book/change', {...data})
            .then(response => response.data);
    },

    deleteAddress(data) {
        return instance.put('book/delete', {...data})
            .then(response => response.data)
    },

    changeDataOfUser(data) {
        return instance.put('user/change', {...data})
            .then(response => response.data);
    },
}

export const orderAPI = {
    getAllOrders(data: GetOrderDataType) {
        return instance.post(`order/get`, {...data})
            .then(response => response.data);
    },

    getDocsOfOrder(id: number) {
        return instance.get(`order/docs/${id}`)
            .then(response => response.data);
    },

    getAllRecords(data) {
        return instance.get(`record/get/${data.countNeed}/${data.currentPage}/${data.dateStart}/${data.dateFinish}/${data.doc_type}/${data.type}`)
            .then(response => response.data);
    },

    repeatOrder(order_id: number) {
        return instance.post('order/repeat', {order_id})
            .then(response => response.data);
    },

    getLastData() {
        return instance.get('order/lastData')
            .then(response => response.data);
    }
}

export const rememberAPI = {
    sendEmail(email: string, URI: string) {
        return instance.post('remember/send', {email, URI})
            .then(response => response.data);
    },

    getPassword(token: string | string[]) {
        return instance.post('remember/password', {token})
            .then(response => response.data);
    },
}