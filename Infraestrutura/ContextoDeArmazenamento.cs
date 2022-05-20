using Core.Entidades;
using Microsoft.EntityFrameworkCore;

namespace Infraestrutura
{
    public class ContextoDeArmazenamento : DbContext
    {
        public ContextoDeArmazenamento(DbContextOptions<ContextoDeArmazenamento> options)
            : base(options)
        {
        }

        public DbSet<PontoTuristico> PontosTuristicos { get; set; }
    }
}