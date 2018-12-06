import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { environment } from '../environments/environment';

// be sure to import HttpClientInMemmoryWebApiModule AFTER HttpClientModule
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { AppRoutingModule }     from './app-routing.module';

import { AppComponent }         from './app.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { HeroDetailComponent }  from './hero-detail/hero-detail.component';
import { HeroesComponent }      from './heroes/heroes.component';
import { HeroSearchComponent }  from './hero-search/hero-search.component';
import { MessagesComponent }    from './messages/messages.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    //
    // forRoot() configuration method takes an InMemoryDataService class that primes the in-memory database
    // will need to generate this file (e.g., ng g s InMemoryData -> makes in-memory-data.service.ts)
    //
    // configuration options include:
    // -- delay: string: ms to delay to simulate round trip.  defaults to 500
    // -- apiBase: string: base path to the api e.g, 'api/', defaults to first path segment
    //
    environment.production ? []: HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService,
      {
        dataEncapsulation: false,     // put content directly in response body
        apiBase: 'api/',
        delay: 500,                   // default
        host: 'localhost'             // default
      }
    )
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    HeroSearchComponent,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
