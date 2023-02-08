import Header from "@root/components/Header";

export default function Home() {

  const stores = [
    {
      id: 1,
      name: "Loja 1",
      description: "Descrição da loja 1",
      image: "https://picsum.photos/200/300"
    },
    {
      id: 2,
      name: "Loja 2",
      description: "Descrição da loja 2",
      image: "https://picsum.photos/200/300"
    },
  ]

  return (
    <>
      <div className="container my-4">
        <h1 className="border-bottom py-2">Suas lojas</h1>
        <div className="d-flex flex-wrap gap-3">
          {stores.map(store => (<div className="card" style={{ flexBasis: "33%" }}>
            <img src={`${store.image}`} className="card-img-top" style={{ objectFit: "cover", height: 150 }} />
            <div className="card-body">
              <h5 className="card-title">{store.name}</h5>
              <p className="card-text">{store.description}</p>
              <div className="w-100 d-flex justify-content-end">
                <a href="#" className="btn btn-primary"><i className="fas fa-arrow-right" /></a>
              </div>
            </div>
          </div>))}
        </div>
      </div>
    </>
  )
}
