"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
var OrderByDirection;
(function (OrderByDirection) {
    OrderByDirection["ASC"] = "ASC";
    OrderByDirection["DESC"] = "DESC";
})(OrderByDirection = exports.OrderByDirection || (exports.OrderByDirection = {}));
class ScapholdService {
    constructor(url, token) {
        this.url = url;
        this.token = token;
        this.client = axios_1.default.create({
            baseURL: url,
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
    }
    post(query, variables) {
        return __awaiter(this, void 0, void 0, function* () {
            variables = variables || {};
            return this.client.post('', {
                query: query,
                variables: variables
            })
                .then(res => res.data.data);
        });
    }
}
exports.ScapholdService = ScapholdService;
