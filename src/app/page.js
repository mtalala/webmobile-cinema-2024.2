"use client";

import styles from "./page.module.css";
import { useState, useEffect } from 'react';

export default function Home() {
  const [dados, setDados] = useState(null);
  const [assentosSelecionados, setAssentosSelecionados] = useState([]);
  const [compraConfirmada, setCompraConfirmada] = useState(false);

  useEffect(() => {
    fetch('/dados.json')
      .then((res) => res.json())
      .then((data) => setDados(data));
  }, []);

  if (!dados) return <div>Carregando...</div>;

  const selecionarAssento = (numero) => {
    setAssentosSelecionados((prev) =>
      prev.includes(numero)
        ? prev.filter((n) => n !== numero)
        : [...prev, numero]
    );
  };

  const calcularPrecoTotal = () => {
    return assentosSelecionados.length * dados.preco;
  };

  const confirmarCompra = () => {
    
    const novosAssentos = dados.assentos.map((assento) =>
      assentosSelecionados.includes(assento.numero)
        ? { ...assento, disponivel: false }
        : assento
    );

    setDados({ ...dados, assentos: novosAssentos });
    setAssentosSelecionados([]); 
    setCompraConfirmada(true);

    setTimeout(() => setCompraConfirmada(false), 3000);
  };

  return (
    <div>
      <div className={styles.container}>

        <h1>{dados.titulo}</h1>
        <p className={styles.horario}>{dados.horario}</p>

        <div className={styles.blocos}>

          <div className={styles.cadeiras}>

            <div className={styles.assentos}>
              {dados.assentos.map((assento) => (
                <div
                  key={assento.numero}
                  className={`assento ${
                    assento.disponivel ? (assentosSelecionados.includes(assento.numero) ? 'selecionado' : 'livre') : 'indisponivel'
                  }`}
                  onClick={() => assento.disponivel && selecionarAssento(assento.numero)}
                ></div>
              ))}
            </div>
            <div className={styles.disp}>

              <p className={styles.pdisp}>tela</p>
              <div className={styles.divtela}></div>

              <div className={styles.balldisp}>

                <div className={styles.bolalivre}></div>
                <p className={styles.pdisp}>livre</p>
                <div className={styles.bolaselec}></div>
                <p className={styles.pdisp}>selecionado</p>
                <div className={styles.bolaindisp}></div>
                <p className={styles.pdisp}>indisponivel</p>

              </div>
            </div>
            
          </div>

          <div className={styles.informac}>
            <h3>Sinopse do filme:</h3>
            <p className={styles.sinopse}>{dados.sinopse}</p>
            <h3>Data de lançamento:</h3>
            <p className={styles.dataLancamento}>{dados.dataLancamento}</p>
            <h3>Direção:</h3>
            <p className={styles.direcao}>{dados.direcao}</p>
          </div>

        </div>

        <div className={styles.preco}>
          <button
            className={styles.botaoComprar}
            onClick={confirmarCompra} 
            disabled={assentosSelecionados.length === 0} 
          >
            Comprar <br /> R$ {calcularPrecoTotal().toFixed(2)}
          </button>
        </div>

        {compraConfirmada && (
          <div className={styles.confirmacao}>
            <p>Compra confirmada!</p>
          </div>
        )}

      </div>
    </div>
  );
}