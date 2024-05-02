import { RequestHandler } from "express";
import { Document, Model } from "mongoose";
// import APIFeatures from "../utils/apiFeatures";
import AppError from "../utils/appError";
import createAsync from "../utils/catchAsync";

interface ModelDocument extends Document {}

const deleteDocument = (Model: Model<ModelDocument>): RequestHandler =>
  createAsync(async (req, res, next) => {
    const id = req.params.id;

    const document = await Model.findOneAndDelete({ id });

    if (!document) {
      return next(new AppError("Document not found", 404));
    }

    res.status(204).send({
      status: "success",
    });
  });

const replaceDocument = (Model: Model<ModelDocument>): RequestHandler =>
  createAsync(async (req, res, next) => {
    const id: string = req.params.id;

    const document = await Model.findOneAndReplace(
      {
        id,
      },
      req.body,
      {
        returnDocument: "after", //returns the document after updated (default is before)
      }
    );

    if (!document) {
      return next(new AppError("Document not found", 404));
    }

    res.status(200).send({
      status: "success",
      data: document,
    });
  });

const createDocument = (Model: Model<ModelDocument>): RequestHandler =>
  createAsync(async (req, res, next) => {
    const body = req.body;

    const newDocument = new Model(body);

    const createdDocument = await newDocument.save();

    res.status(201).send({
      status: "success",
      data: createdDocument,
    });
  });

const updateDocument = (Model: Model<ModelDocument>): RequestHandler =>
  createAsync(async (req, res, next) => {
    const id = req.params.id;

    const document = await Model.findByIdAndUpdate(id, req.body, {
      new: true, //give us the object
      //rawResult: true, //give us the hole document with mongo data
      runValidators: true,
    });

    if (!document) {
      return next(new AppError("Document not found", 404));
    }

    res.status(200).send({
      status: "success",
      data: document,
    });
  });

const getDocument = (
  Model: Model<ModelDocument>,
  populateOptions?: { path: string; select?: string }
): RequestHandler =>
  createAsync(async (req, res, next) => {
    const documentId = req.params.id;

    let query = Model.findById(documentId);

    if (populateOptions) {
      query = query.populate(populateOptions);
    }

    const document = await query;

    if (!document) {
      return next(new AppError("Document not found", 404));
    }

    res.status(200).send({
      status: "success",
      data: document,
    });
  });

const getAllDocuments = (Model: Model<ModelDocument>): RequestHandler =>
  createAsync(async (req, res, next) => {
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
  });

export {
  deleteDocument,
  replaceDocument,
  createDocument,
  updateDocument,
  getDocument,
  getAllDocuments,
};
