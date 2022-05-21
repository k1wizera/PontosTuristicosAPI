using Core.Entidades;

namespace Core.Interface
{
    public interface IPontoTuristico
    {
        Task<IReadOnlyList<PontoTuristico>> ListarPontosTuristicos();
        Task<PontoTuristico> ListarPontosTuristicosPorId(int id);
        Task<PontoTuristico> CriarPontoTuristico(PontoTuristico pontoturistico);
        Task<PontoTuristico> AtualizarPontoTuristico(PontoTuristico pontoturistico);
        Task<PontoTuristico> DeletarPontoTuristico(int id);
    }
}
