using Core.Entidades;
using Core.Interface;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class PontosTuristicosControlador : ControllerBase
    {
        private readonly IPontoTuristico _pontoturistico;
        public PontosTuristicosControlador(IPontoTuristico pontoturistico)
        {
            _pontoturistico = pontoturistico;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<PontoTuristico>>> ListarTodos()
        {
            return Ok(await _pontoturistico.ListarPontosTuristicos());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PontoTuristico>> ListarPorId(int id)
        {
            var pontoturistico = await _pontoturistico.ListarPontosTuristicosPorId(id);
            if (pontoturistico == null)
            {
                return NotFound();
            }
            return pontoturistico;
        }

        [HttpPost]
        public async Task<ActionResult<PontoTuristico>> Criar(PontoTuristico pontoturistico)
        {
            await _pontoturistico.CriarPontoTuristico(pontoturistico);
            return CreatedAtAction("Get", new { id = pontoturistico.Id }, pontoturistico);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Atualizar(int id, PontoTuristico pontoturistico)
        {
            if (id != pontoturistico.Id)
            {
                return BadRequest();
            }
            await _pontoturistico.AtualizarPontoTuristico(pontoturistico);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<PontoTuristico>> Deletar(int id)
        {
            var pontoturistico = await _pontoturistico.DeletarPontoTuristico(id);
            if (pontoturistico == null)
            {
                return NotFound();
            }
            return pontoturistico;
        }
    }
}
