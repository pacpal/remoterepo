"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarService = void 0;
const camelcaseKeys = require("camelcase-keys");
const car_pb_1 = require("./proto_gen/car/car_pb");
const request_1 = require("./request");
var CarService;
(function (CarService) {
    function subscribe(onMsg) {
        const socket = wx.connectSocket({
            url: request_1.Coolcar.wsAddr + '/ws',
        });
        socket.onMessage(msg => {
            const obj = JSON.parse(msg.data);
            onMsg(car_pb_1.car.v1.CarEntity.fromObject(camelcaseKeys(obj, {
                deep: true,
            })));
        });
        return socket;
    }
    CarService.subscribe = subscribe;
    function getCar(id) {
        return request_1.Coolcar.sendRequestWithAuthRetry({
            method: 'GET',
            path: `/v1/car/${encodeURIComponent(id)}`,
            respMarshaller: car_pb_1.car.v1.Car.fromObject,
        });
    }
    CarService.getCar = getCar;
})(CarService = exports.CarService || (exports.CarService = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2FyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGdEQUFpRDtBQUNqRCxtREFBNkM7QUFDN0MsdUNBQW9DO0FBRXBDLElBQWlCLFVBQVUsQ0FzQjFCO0FBdEJELFdBQWlCLFVBQVU7SUFDdkIsU0FBZ0IsU0FBUyxDQUFDLEtBQXFDO1FBQzNELE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQyxhQUFhLENBQUM7WUFDNUIsR0FBRyxFQUFFLGlCQUFPLENBQUMsTUFBTSxHQUFHLEtBQUs7U0FDOUIsQ0FBQyxDQUFBO1FBQ0YsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNuQixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFjLENBQUMsQ0FBQTtZQUMxQyxLQUFLLENBQUMsWUFBRyxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUM3QixhQUFhLENBQUMsR0FBRyxFQUFFO2dCQUNmLElBQUksRUFBRSxJQUFJO2FBQ2IsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNaLENBQUMsQ0FBQyxDQUFBO1FBQ0YsT0FBTyxNQUFNLENBQUE7SUFDakIsQ0FBQztJQVplLG9CQUFTLFlBWXhCLENBQUE7SUFFRCxTQUFnQixNQUFNLENBQUMsRUFBVTtRQUM3QixPQUFPLGlCQUFPLENBQUMsd0JBQXdCLENBQUM7WUFDcEMsTUFBTSxFQUFFLEtBQUs7WUFDYixJQUFJLEVBQUUsV0FBVyxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsRUFBRTtZQUN6QyxjQUFjLEVBQUUsWUFBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsVUFBVTtTQUN4QyxDQUFDLENBQUE7SUFDTixDQUFDO0lBTmUsaUJBQU0sU0FNckIsQ0FBQTtBQUNMLENBQUMsRUF0QmdCLFVBQVUsR0FBVixrQkFBVSxLQUFWLGtCQUFVLFFBc0IxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjYW1lbGNhc2VLZXlzID0gcmVxdWlyZShcImNhbWVsY2FzZS1rZXlzXCIpO1xuaW1wb3J0IHsgY2FyIH0gZnJvbSBcIi4vcHJvdG9fZ2VuL2Nhci9jYXJfcGJcIjtcbmltcG9ydCB7IENvb2xjYXIgfSBmcm9tIFwiLi9yZXF1ZXN0XCI7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ2FyU2VydmljZSB7XG4gICAgZXhwb3J0IGZ1bmN0aW9uIHN1YnNjcmliZShvbk1zZzogKGM6IGNhci52MS5JQ2FyRW50aXR5KSA9PiB2b2lkKSB7XG4gICAgICAgIGNvbnN0IHNvY2tldCA9IHd4LmNvbm5lY3RTb2NrZXQoe1xuICAgICAgICAgICAgdXJsOiBDb29sY2FyLndzQWRkciArICcvd3MnLFxuICAgICAgICB9KVxuICAgICAgICBzb2NrZXQub25NZXNzYWdlKG1zZyA9PiB7XG4gICAgICAgICAgICBjb25zdCBvYmogPSBKU09OLnBhcnNlKG1zZy5kYXRhIGFzIHN0cmluZylcbiAgICAgICAgICAgIG9uTXNnKGNhci52MS5DYXJFbnRpdHkuZnJvbU9iamVjdChcbiAgICAgICAgICAgICAgICBjYW1lbGNhc2VLZXlzKG9iaiwge1xuICAgICAgICAgICAgICAgICAgICBkZWVwOiB0cnVlLFxuICAgICAgICAgICAgICAgIH0pKSlcbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIHNvY2tldFxuICAgIH1cblxuICAgIGV4cG9ydCBmdW5jdGlvbiBnZXRDYXIoaWQ6IHN0cmluZyk6IFByb21pc2U8Y2FyLnYxLklDYXI+IHtcbiAgICAgICAgcmV0dXJuIENvb2xjYXIuc2VuZFJlcXVlc3RXaXRoQXV0aFJldHJ5KHtcbiAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgICBwYXRoOiBgL3YxL2Nhci8ke2VuY29kZVVSSUNvbXBvbmVudChpZCl9YCxcbiAgICAgICAgICAgIHJlc3BNYXJzaGFsbGVyOiBjYXIudjEuQ2FyLmZyb21PYmplY3QsXG4gICAgICAgIH0pXG4gICAgfVxufSJdfQ==