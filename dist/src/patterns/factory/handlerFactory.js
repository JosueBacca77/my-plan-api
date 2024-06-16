"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlerFactory = void 0;
// import APIFeatures from "../utils/apiFeatures";
const appError_1 = __importDefault(require("../../utils/appError"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const deleteDocument = (Model) => (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const document = yield Model.findOneAndDelete({ _id: id });
    if (!document) {
        return next(new appError_1.default("Document not found", 404));
    }
    res.status(204).send({
        status: "success",
    });
}));
const replaceDocument = (Model) => (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const document = yield Model.findOneAndReplace({
        id,
    }, req.body, {
        returnDocument: "after", //returns the document after updated (default is before)
    });
    if (!document) {
        return next(new appError_1.default("Document not found", 404));
    }
    res.status(200).send({
        status: "success",
        data: document,
    });
}));
const createDocument = (Model) => (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const newDocument = new Model(body);
    const createdDocument = yield newDocument.save();
    res.status(201).send({
        status: "success",
        data: createdDocument,
    });
}));
const updateDocument = (Model) => (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const document = yield Model.findByIdAndUpdate(id, req.body, {
        new: true, //give us the object
        //rawResult: true, //give us the hole document with mongo data
        runValidators: true,
    });
    if (!document) {
        return next(new appError_1.default("Document not found", 404));
    }
    res.status(200).send({
        status: "success",
        data: document,
    });
}));
const getDocument = (Model, populateOptions) => (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const documentId = req.params.id;
    let query = Model.findById(documentId);
    if (populateOptions) {
        query = query.populate(populateOptions);
    }
    const document = yield query;
    if (!document) {
        return next(new appError_1.default("Document not found", 404));
    }
    res.status(200).send({
        status: "success",
        data: document,
    });
}));
const getAllDocuments = (Model) => (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //     let filter = {};
    //     if (req.params.tourId) {
    //       filter = { tour: req.params.tourId };
    //     }
    //     let query = Model.find(filter);
    //     const API = new APIFeatures(query, req.query).filter().sort();
    //     await API.paginate();
    //     const documents = await API.query;
    //     res.status(200).send({
    //       status: 'success',
    //       results: documents.length,
    //       data: {
    //         documents: documents,
    //       },
    //    });
}));
exports.handlerFactory = {
    deleteDocument,
    replaceDocument,
    createDocument,
    updateDocument,
    getDocument,
    getAllDocuments,
};
