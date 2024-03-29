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
import { AllowanceDeductionIdLink } from "./AllowanceDeductionIdLink";
import { Overtime } from "./Overtime";
import { Todo } from "./Todo";

const reAuth = new ReAuthenticate();
export class Api{
    //'https://www.caribbeancodingacademygrenada.com/gdservice'
    baseURL = '/gdservice';
    pendingRequests = [];

    constructor(){
        this.authNotRequoredRoutes = [
            routes.signin(),
            routes.passRecovery(),
        ];
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
        this.allowanceDeductionIdLink = new AllowanceDeductionIdLink(this);
        this.overtime = new Overtime(this);
        this.todo = new Todo(this);
    }

    hasPendingRequest(){
        return !!this.pendingRequests.length;
    }

    addPendingRequest(key){
        this.pendingRequests.push(key);
    }

    popPendingRequest(key){
        this.pendingRequests = this.pendingRequests.filter((k)=>key !== k);
    }

    hasRouteThatRequireAuthTrigger(){
        for(let route of this.authNotRequoredRoutes){
            if(window.location.hash.includes(route)) return true;
        }
        return false;
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
        if(error.response.status === 401 && !this.hasRouteThatRequireAuthTrigger()){
            reAuth.open();
        }else{ 
            reAuth.close();
        }
        throw error;
    }

    async post(route, data, option){
        const requestId = uuidv4();
        try{
            this.addPendingRequest(requestId);
            const response = await this.axios.post(route, data);
            this.popPendingRequest(requestId);
            return response;
        }catch(error){
            this.popPendingRequest(requestId);
            return this.handler(error, option);
        }
    }

    async get(route, data, option){
        //return await this.axios.get(route, {params: {}}, data);
        const requestId = uuidv4();
        try{
            this.addPendingRequest(requestId);
            const response = await this.axios.post(route, data);
            this.popPendingRequest(requestId);
            return response;
        }catch(error){
            this.popPendingRequest(requestId);
            return this.handler(error, option);
        }
    }
}

export const api = new Api();
