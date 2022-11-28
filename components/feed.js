import initials from 'initialism'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Feed() {
  const [ogImage, setOgImage] = useState({})
  const [loading, setLoading] = useState(true)
  const { data, error } = useSWR('/api/products', fetcher)

  // `https://corsproxy.io/?https://api.dub.sh/metatags?url=${product.href}`,
  return (
    <>
      <div className="overflow-hidden bg-white sm:rounded-md">
        <div className="mx-6 mt-6">
          <h1 className="text-gray-900 text-xl">Featured Products</h1>
        </div>
        <ul role="list" className="">
          {!!data ? (
            data.map((product) => (
              <li key={product.name}>
                <a href={product.href} className="block">
                  <div className="flex items-center px-4 py-6 sm:px-6">
                    <div className="flex">
                      <div className="">
                        {ogImage[product.id] ? (
                          <img
                            className="h-[250] w-full rounded-md object-cover"
                            src={ogImage[product.id]}
                            alt=""
                          />
                        ) : (
                          <div className="h-16 w-16 rounded-md flex justify-center items-center text-2xl bg-[#97D9E1]">
                            {initials(product.name)}
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                        <div>
                          <p className="truncate text-lg font-medium text-gray-700">
                            {product.name}
                          </p>
                          <p className="mt-2 flex items-center text-sm text-gray-500 mb-2">
                            <span className="truncate">
                              {product.description}
                            </span>
                          </p>
                          <div className="flex">
                            {!!product.tags.length &&
                              product.tags.map((tag, i) => {
                                return (
                                  <span
                                    key={i}
                                    className="inline-flex whitespace-nowrap items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800"
                                  >
                                    {tag}
                                  </span>
                                )
                              })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
            ))
          ) : (
            <div>loading</div>
          )}
        </ul>
      </div>
      <div className="overflow-hidden bg-white sm:rounded-md mt-6">
        <div className="mx-6 mt-6">
          <h1 className="text-gray-900 text-xl">Featured News</h1>
        </div>
        {/*<ul role="list" className="">*/}
        {/*  {products.map((product) => (*/}
        {/*    <li key={product.name}>*/}
        {/*      <a href={product.href} className="block">*/}
        {/*        <div className="flex items-center px-4 py-6 sm:px-6">*/}
        {/*          <div className="flex min-w-0 flex-1">*/}
        {/*            <div className="flex-shrink-0">*/}
        {/*              {product.imageUrl ? (*/}
        {/*                <img*/}
        {/*                  className="h-20 w-20 rounded-md"*/}
        {/*                  src={product.imageUrl}*/}
        {/*                  alt=""*/}
        {/*                />*/}
        {/*              ) : (*/}
        {/*                <div className="h-16 w-16 rounded-md flex justify-center items-center text-2xl bg-[#D9AFD9]">*/}
        {/*                  {initials(product.name)}*/}
        {/*                </div>*/}
        {/*              )}*/}
        {/*            </div>*/}
        {/*            <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">*/}
        {/*              <div>*/}
        {/*                <p className="truncate text-lg font-medium text-gray-700">*/}
        {/*                  {product.name}*/}
        {/*                </p>*/}
        {/*                <p className="mt-2 flex items-center text-sm text-gray-500 mb-2">*/}
        {/*                  <span className="truncate">*/}
        {/*                    {product.description}*/}
        {/*                  </span>*/}
        {/*                </p>*/}
        {/*                <div className="flex">*/}
        {/*                  {!!product.tags.length &&*/}
        {/*                    product.tags.map((tag, i) => {*/}
        {/*                      return (*/}
        {/*                        <span*/}
        {/*                          key={i}*/}
        {/*                          className="inline-flex whitespace-nowrap items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800"*/}
        {/*                        >*/}
        {/*                          {tag}*/}
        {/*                        </span>*/}
        {/*                      )*/}
        {/*                    })}*/}
        {/*                </div>*/}
        {/*              </div>*/}
        {/*            </div>*/}
        {/*          </div>*/}
        {/*        </div>*/}
        {/*      </a>*/}
        {/*    </li>*/}
        {/*  ))}*/}
        {/*</ul>*/}
      </div>
    </>
  )
}
