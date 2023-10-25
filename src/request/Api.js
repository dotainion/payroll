import axios from "axios";
import { FetchSession } from "./FetchSession";
import { Authenticate } from "./Authenticate";
import { Users } from "./Users";
import { Allowance } from "./Allowance";
import { Deduction } from "./Deduction";
import { Documents } from "./Documents";
import { Departments } from "./Departments";
import { Report } from "./Report";
import { Loan } from "./Loan";
import { Bank } from "./Bank";
import { routes } from "../router/routes";
import { ReAuthenticate } from "../utils/ReAuthenticate";
import { RegisterAdmin } from "./RegisterAdmin";
import { Mail } from "./Mail";
import { Settings } from "./Settings";
import { Notification } from "./Notification";
import { Tax } from "./Tax";
import { v4 as uuidv4 } from 'uuid';

const reAuth = new ReAuthenticate();
export class Api{
    //'https://www.caribbeancodingacademygrenada.com/gdservice'
    baseURL = '/gdservice';

    constructor(){
        this.axios = axios.create({baseURL: this.baseURL});
        this.session = new FetchSession(this);
        this.auth = new Authenticate(this);
        this.user = new Users(this);
        this.allowance = new Allowance(this);
        this.deduction = new Deduction(this);
        this.document = new Documents(this);
        this.department = new Departments(this);
        this.report = new Report(this);
        this.loan = new Loan(this);
        this.bank = new Bank(this);
        this.admin = new RegisterAdmin(this);
        this.mail = new Mail(this);
        this.settings = new Settings(this);
        this.notification = new Notification(this);
        this.tax = new Tax(this);
    }

    handler(error, option){
        if(option?.stopReAuthentication === true){
            throw error;
        }
        if(window.location.hash.includes('business')){
            throw error;
        }
        if(window.location.hash.includes('token')){
            throw error;
        }
        if(error.response.status === 401 && !window.location.hash.includes(routes.signin())){
            reAuth.open();
        }else{ 
            reAuth.close();
        }
        throw error;
    }

    async post(route, data, option){
        try{
            return await this.axios.post(route, data);
        }catch(error){
            return this.handler(error, option);
        }
    }

    async get(route, data, option){
        //return await this.axios.get(route, {params: {}}, data);
        try{
            return await this.axios.post(route, data);
        }catch(error){
            return this.handler(error, option);
        }
    }
}

export const api = new Api();
