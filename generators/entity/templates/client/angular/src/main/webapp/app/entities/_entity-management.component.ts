import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';

import { StateService } from 'ui-router-ng2';
import { <%= entityClass %> } from './<%= entityFileName %>.model';
import { <%= entityClass %>Service } from './<%= entityFileName %>.service';
import { EventManager, AlertService, ITEMS_PER_PAGE, ParseLinks, Principal, PaginationUtil<%_ if (fieldsContainBlob) { _%>, DataUtils<% } %> } from '../../shared';
import { PaginationConfig } from "../../blocks/config/uib-pagination.config";

@Component({
    selector: '<%= entityFileName %>-mgmt',
    templateUrl: './<%= entityFileName %>.component.html'
})
export class <%= entityAngularJSName %>Component implements OnInit {
    <%_ if (pagination === 'pagination' || pagination === 'pager') { _%>
    <%- include('pagination-template'); -%>
    <%_ } else if (pagination === 'infinite-scroll') { %>
    <%- include('infinite-scroll-template'); -%>
    <% } else if (pagination === 'no') { _%>
    <%- include('no-pagination-template'); -%>
    <% } %>
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeIn<%= entityClassPlural %>();
    }

    <%_ if (pagination !== 'infinite-scroll') { _%>
    registerChangeIn<%= entityClassPlural %>() {
        this.eventManager.subscribe('<%= entityInstance %>ListModification', (response) => this.loadAll());
    }
    <% } %>

    private onError (error) {
        this.alertService.error(error.message, null, null);
    }
    <%_ if (pagination !== 'no') { _%>
    <%_ if (databaseType !== 'cassandra') { _%>

    sort () {
        let result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }
    <% } } %>
}