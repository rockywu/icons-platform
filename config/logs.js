"use strict";
/**
 * Created by rocky on 2017/7/25.
 */
module.exports = {
    appenders: {
        out: { type: 'stdout' },
        app : {
            type: 'file',
                filename: '../logs/system.log'
        }
    },
    categories: {
    default: { appenders: ['out', 'app'], level: 'trace' }
    }
};