/**
 * Developer: Stepan Burguchev
 * Date: 7/1/2015
 * Copyright: 2009-2015 Comindware®
 *       All Rights Reserved
 *
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Comindware
 *       The copyright notice above does not evidence any
 *       actual or intended publication of such source code.
 */

/* global define, require, Backbone, Marionette, $, _, Localizer */

define(['coreui'],
    function (core) {
        'use strict';

        return Backbone.Model.extend({
            initialize: function () {
                core.utils.helpers.applyBehavior(this, core.models.behaviors.SelectableBehavior.Selectable);
            }
        });
    });
