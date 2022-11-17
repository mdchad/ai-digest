import initials from 'initialism'
import {useEffect} from "react";
const Airtable = require('airtable');
Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY
});
const base = Airtable.base('appyj0NYklROUhuYN')

const products = [
  {
    name: 'Scale AI',
    imageUrl: '',
    href: 'https://scale.com/',
    tags: ['image generation', 'product ads generation'],
    description: 'A good company'
  },
  {
    name: 'Ben Bites',
    imageUrl: '',
    href: '#',
    tags: ['newsletter'],
    description: 'Daily AI newsletter'
  },
  {
    name: 'Replicate',
    imageUrl: '',
    href: '#',
    tags: ['API provider'],
    description: 'Run AI model'
  },
]

export default function Feed() {
  useEffect(() => {
    base('Products').select({
      // Selecting the first 3 records in Grid view:
      maxRecords: 3,
      view: "Grid view"
    }).eachPage(function page(records, fetchNextPage) {
      console.log(records)
      // This function (`page`) will get called for each page of records.

      records.forEach(function(record) {
        console.log('Retrieved', record.get('Name'));
      });

      // To fetch the next page of records, call `fetchNextPage`.
      // If there are more records, `page` will get called again.
      // If there are no more records, `done` will get called.
      fetchNextPage();

    }, function done(err) {
      if (err) { console.error(err); return; }
    });
  }, [])

  return (
      <div className="overflow-hidden bg-white shadow sm:rounded-md">
        <div className="mx-6 mt-6">
          <h1 className="text-gray-900 text-xl">Featured Products</h1>
        </div>
        <ul role="list" className="">
          {products.map((product) => (
              <li key={product.name}>
                <a href={product.href} className="block">
                  <div className="flex items-center px-4 py-6 sm:px-6">
                    <div className="flex min-w-0 flex-1">
                      <div className="flex-shrink-0">
                        { product.imageUrl ? <img className="h-20 w-20 rounded-md" src={product.imageUrl} alt="" /> : <div className="h-16 w-16 rounded-md flex justify-center items-center text-2xl bg-gradient-to-r from-indigo-200 to-pink-100">{initials(product.name)}</div> }
                      </div>
                      <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                        <div>
                          <p className="truncate text-lg font-medium text-gray-700">{product.name}</p>
                          <p className="mt-2 flex items-center text-sm text-gray-500 mb-2">
                            <span className="truncate">{product.description}</span>
                          </p>
                            {/*<EnvelopeIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />*/}
                          <div className="flex">
                            {!!product.tags.length && product.tags.map(tag => {
                              return (
                                  <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">{tag}</span>
                              )
                            })}
                          </div>
                        </div>
                        {/*<div className="hidden md:block">*/}
                        {/*  <div>*/}
                        {/*    <p className="text-sm text-gray-900">*/}
                        {/*      Applied on <time dateTime={application.date}>{application.dateFull}</time>*/}
                        {/*    </p>*/}
                        {/*    <p className="mt-2 flex items-center text-sm text-gray-500">*/}
                        {/*      <CheckCircleIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400" aria-hidden="true" />*/}
                        {/*      {application.stage}*/}
                        {/*    </p>*/}
                        {/*  </div>*/}
                        {/*</div>*/}
                      </div>
                    </div>
                    {/*<div>*/}
                    {/*  <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />*/}
                    {/*</div>*/}
                  </div>
                </a>
              </li>
          ))}
        </ul>
      </div>
  )
}
