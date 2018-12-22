"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ticket {
    constructor() {
        this._id = "";
        this.replies = new Array();
        this.subject = "";
        this.ticket_id = "";
        this.created_date = null;
        this.status = null;
        this.type = null;
        this.user_id = 0;
        this.user_operator_id = 0;
    }
}
exports.ticket = ticket;
