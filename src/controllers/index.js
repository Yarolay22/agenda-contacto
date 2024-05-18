import { response } from "express";

export function showPageAgenda(req, res = response){
    return res.render('agenda', {})
}