"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRepository_1 = require("../../Repositories/Base/BaseRepository");
const ticketMetadata_1 = require("../../Common/Metadata/ticketMetadata");
const ExternalRequests_1 = require("../../Infrastructure/ExternalRequests");
class TicketsManager extends BaseRepository_1.BaseRepository {
    constructor() {
        super("tickets");
    }
    create(item, callback) {
        var that = this;
        if (item.id == 0) {
            // Insert new ticket
            var obj = new ticketMetadata_1.ticket();
            // Get InProgress status forticket status
            ExternalRequests_1.ExternalRequest.syncPostRequest(process.env.MAIN_URL + "general_item/type", { type: "TicketStatus", code: "1" }, function (gt_err, gt_result) {
                obj.status = gt_result[0];
                // Get Ticket Type for ticket
                ExternalRequests_1.ExternalRequest.syncPostRequest(process.env.MAIN_URL + "general_item/type", { type: "TicketType", code: "1" }, function (gt1_err, gt1_result) {
                    obj.type = gt1_result[0];
                    obj.subject = item.subject;
                    obj.user_id = 171; // Login information is required
                    // Generate random ticket number
                    obj.ticket_id = (Math.floor(Math.random() * 888888) + 111111).toString();
                    // Push the first reply for ticket
                    obj.replies.push({
                        user_id: 171,
                        is_operator: false,
                        status_id: 1,
                        body: item.message,
                        created_date: new Date(),
                        is_read: false
                    });
                    obj.created_date = new Date();
                    that.repository.grabInsert(that.entity, [obj], callback);
                });
            });
        }
        else {
            // Add reply to existing ticket
            this.findOne(item.id, function (ticket_err, ticket_result) {
                if (ticket_result) {
                    if (!ticket_result[0].replies)
                        ticket_result[0].replies = new Array();
                    // Push reply for ticket
                    ticket_result[0].replies.push({
                        user_id: 171,
                        is_operator: false,
                        status_id: 1,
                        body: item.message,
                        created_date: new Date(),
                        is_read: false
                    });
                    that.update(ticket_result[0], callback);
                }
                else
                    callback({ error: "Ticket not found!" }, null);
            });
        }
    }
    getMe(callback) {
        // TODO: Login information Required
        this.find({ user_id: 171 }, callback);
    }
    getMeOperator(callback) {
        // TODO: Login information Required
        this.find({ user_operator_id: 171 }, callback);
    }
    updateOperator(ticketId, callback) {
        var that = this;
        this.findOne(ticketId, function (ticket_err, ticket_result) {
            if (ticket_result) {
                ticket_result[0].user_operator_id = 171; // Login Information is required
                that.update(ticket_result[0], callback);
            }
            else
                callback({ error: "Ticket not found!" }, null);
        });
    }
    findByType(status_id, callback) {
        this.find({ "status.id": status_id }, callback);
    }
}
exports.TicketsManager = TicketsManager;
Object.seal(TicketsManager);
