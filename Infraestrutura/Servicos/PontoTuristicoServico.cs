using Core.Entidades;
using Core.Interface;
using Microsoft.EntityFrameworkCore;

namespace Infraestrutura.Servicos
{
    public class PontoTuristicoServico : IPontoTuristico
    {
        private readonly ContextoDeArmazenamento _armazenamento;
        public PontoTuristicoServico(ContextoDeArmazenamento armazenamento)
        {
            _armazenamento = armazenamento;
        }

        public async Task<IReadOnlyList<PontoTuristico>> ListarPontosTuristicos()
        {
            return await _armazenamento.Set<PontoTuristico>().ToListAsync();
        }

        public async Task<PontoTuristico> CriarPontoTuristico(PontoTuristico pontoturistico)
        {
            _armazenamento.Set<PontoTuristico>().Add(pontoturistico);
            await _armazenamento.SaveChangesAsync();
            return pontoturistico;
        }

        public async Task<PontoTuristico> AtualizarPontoTuristico(PontoTuristico pontoturistico)
        {
            _armazenamento.Entry(pontoturistico).State = EntityState.Modified;
            await _armazenamento.SaveChangesAsync();
            return pontoturistico;
        }

        public async Task<PontoTuristico> DeletarPontoTuristico(int id)
        {
            var pontoturistico = await _armazenamento.Set<PontoTuristico>().FindAsync(id);
            if (pontoturistico == null)
            {
                return pontoturistico;
            }
            _armazenamento.Set<PontoTuristico>().Remove(pontoturistico);
            await _armazenamento.SaveChangesAsync();
            return pontoturistico;
        }

        public async Task<PontoTuristico> ListarPontosTuristicosPorId(int id)
        {
            return await _armazenamento.Set<PontoTuristico>().FindAsync(id);
        }
    }
}