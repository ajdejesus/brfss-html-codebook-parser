library(jsonify, help, pos = 2, lib.loc = NULL)

load('./objects/brfss2019_object.json')

object <- from_json('./objects/brfss2019_object.json', T)
